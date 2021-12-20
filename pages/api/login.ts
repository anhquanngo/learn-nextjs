// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy, { ProxyReqCallback } from 'http-proxy';
import Cookies from 'cookies'

type Data = {
    message: string
}

export const config = {
    api: {
        bodyParser: false,
    },
}

const proxy = httpProxy.createProxyServer()

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== 'POST') {
        return res.status(404).json({ message: "method not supported" })
    }
    return new Promise((resolve) => {
        // don't send cookies to API server
        console.log('login request');

        req.headers.cookie = '';

        const handleLoginResponse: ProxyReqCallback = (proxyRes, req, res) => {
            let body = '';
            proxyRes.on('data', function (chunk: any) {
                body += chunk;
            });
            proxyRes.on('end', function () {
                const { accessToken, expireAt } = JSON.parse(body)

                // convert token to cookies
                const cookies = new Cookies(req, res, { secure: process.env.NODE_ENV === 'development' });
                cookies.set('access_token', accessToken, {
                    httpOnly: true,
                    sameSite: 'lax',
                    expires: new Date(expireAt)
                })


                try {
                    (res as NextApiResponse).status(200).json({ massage: 'login successfully' })
                } catch (error) {
                    (res as NextApiResponse).status(500).json({ massage: 'something went wrong' })
                }

                resolve(true)
            });
        }

        proxy.once('proxyRes', handleLoginResponse)

        // /api/students
        // /https://js-post-api.herrokuapp.com/api/students
        proxy.web(req, res, {
            target: process.env.API_URL,
            changeOrigin: true,
            selfHandleResponse: true
        })
    })
}

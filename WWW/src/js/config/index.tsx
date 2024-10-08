import * as React from 'react'

const config = {
    api: {
        baseURL: 'http://arb.local/api/v1/',
        timeout: 100000,
        apiDateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
        apiDateFormat: 'YYYY-MM-DD',
    },
    dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
    dateFormat: 'YYYY-MM-DD',
    texts: {
        version: 'v0.3.1',
        frameworkName: (
            <span>
                <strong>another</strong> boilerplate
            </span>
        ),
    },
    siteTitle: 'another-react-boilerplate',
    siteTitleSeparator: ' - ',
}

export default config

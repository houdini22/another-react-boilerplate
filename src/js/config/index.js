import { SidebarHeader } from '../layouts/PageLayout/components'
import React from 'react'

const config = {
    api: {
        baseURL: 'http://javascript_framework.local/index.php/api/v1/',
        timeout: 10000,
        apiDateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
        apiDateFormat: 'YYYY-MM-DD',
    },
    dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
    dateFormat: 'YYYY-MM-DD',
    texts: {
        version: 'v0.1-alpha',
        frameworkName: (
            <span>
                <strong>another</strong> boilerplate
            </span>
        ),
    },
}

export default config

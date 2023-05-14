import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { AddLinkForm } from '../components/AddMenu/AddLinkForm'
import { reduxForm, formValueSelector } from 'redux-form'
import { myGet } from '../../../modules/http'
import { withRouter } from '../../../helpers/router'
import _ from 'lodash'

export const FORM_NAME = 'add-link-form-container'
const selector = formValueSelector(FORM_NAME)

class AddLinkFormContainerBase extends React.Component<null, null> {
    state = {
        documents: [],
        linkCategories: [],
        files: [],
        icons: [],
    }

    componentDidMount() {
        this.fetchIconsForSelect();
    }

    componentDidUpdate(prevProps: Readonly<null>, prevState: Readonly<null>, snapshot?: any) {
        const { target } = this.props
        if (target === 'document' && prevProps.target !== target) {
            this.fetchDocumentsForSelect()
        } else if (target === 'category' && prevProps.target !== target) {
            this.fetchCategoriesForSelect()
        } else if (target === 'file' && prevProps.target !== target) {
            this.fetchFilesForSelect()
        }
    }

    fetchDocumentsForSelect() {
        myGet('/cms/pages/link/getDocuments').then((documents) => {
            const options = {}
            documents.forEach(
                ({
                    document_category: {
                        category: { category_id, category_name },
                    },
                    document: { document_name },
                    depth,
                    id: document_id,
                }) => {
                    const option = _.get(`${category_id}${category_name}${depth}`, options, {
                        label: ' - '.repeat(depth - 1) + category_name,
                        children: [],
                    })
                    option.children = [
                        ...option.children,
                        {
                            label: document_name,
                            value: document_id,
                        },
                    ]
                    options[`${category_id}${category_name}${depth}`] = option
                },
            )
            this.setState({ documents: Object.keys(options).map((key) => options[key]) })
        })
    }
    fetchIconsForSelect() {
        myGet('/cms/pages/link/getIcons').then((icons) => {
            const options = []
            icons.forEach(({ name, id: file_id }) => {
                options.push({
                    label: name,
                    value: file_id,
                })
            })
            this.setState({ icons: options })
        })
    }
    fetchCategoriesForSelect() {
        myGet('/cms/pages/link/getCategories').then((categories) => {
            const options = []
            categories.forEach(({ category: { category_name }, depth, id: category_id }) => {
                options.push({
                    label: ' - '.repeat(depth - 1) + category_name,
                    value: category_id,
                })
            })
            this.setState({ linkCategories: options })
        })
    }
    fetchFilesForSelect() {
        myGet('/cms/pages/link/getFiles').then((files) => {
            const options = []
            files.forEach(({ name, id: file_id }) => {
                options.push({
                    label: name,
                    value: file_id,
                })
            })
            this.setState({ files: options })
        })
    }
    render() {
        return <AddLinkForm {...this.props} {...this.state} />
    }
}

const AddLinkFormContainer = compose(
    withRouter,
    connect((state) => {
        const target = selector(state, 'target')
        return {
            target,
        }
    }, null),
    reduxForm({
        form: FORM_NAME,
        enableReinitialize: true,
        destroyOnUnmount: false,
        validate: ({ link: { link_name, category_id, document_id }, target }) => {
            const errors = { link: {} }

            if (!link_name?.length) {
                errors['link']['link_name'] = 'Required.'
            }
            if (!target) {
                errors['target'] = 'Required.'
            }
            if (target === 'category' && !category_id) {
                errors['link']['category_id'] = 'Required'
            }
            if (target === 'document' && !document_id) {
                errors['link']['document_id'] = 'Required.'
            }

            return errors
        },
    }),
)(AddLinkFormContainerBase)

export { AddLinkFormContainer }
export default { AddLinkFormContainer }

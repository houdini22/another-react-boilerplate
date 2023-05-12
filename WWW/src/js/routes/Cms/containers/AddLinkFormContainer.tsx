import * as React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { AddLinkForm } from '../components/AddLink/AddLinkForm'
import { reduxForm, SubmissionError, formValueSelector } from 'redux-form'
import { actions } from '../../../reducers/cms-pages'
import { myGet, processAPIerrorResponseToFormErrors } from '../../../modules/http'
import { withRouter } from '../../../helpers/router'
import _ from 'lodash'

export const FORM_NAME = 'add-link-form-container'
const selector = formValueSelector(FORM_NAME)

class AddLinkFormContainerBase extends React.Component<null, null> {
    state = {
        categories: [],
        documents: [],
        linkCategories: [],
    }

    componentDidMount() {
        this.fetchParentCategorySelectOptions()
    }

    componentDidUpdate(prevProps: Readonly<null>, prevState: Readonly<null>, snapshot?: any) {
        const {
            formValues: { target },
        } = this.props
        if (target === 'document' && prevProps.formValues.target !== target) {
            this.fetchDocumentsForSelect()
        } else if (target === 'category' && prevProps.formValues.target !== target) {
            this.fetchCategoriesForSelect()
        }
    }

    fetchParentCategorySelectOptions() {
        const { fetchParentCategorySelectOptions } = this.props

        return fetchParentCategorySelectOptions().then((options) => {
            this.setState({
                categories: options,
            })
        })
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

    render() {
        return <AddLinkForm {...this.props} {...this.state} />
    }
}

const AddLinkFormContainer = compose(
    withRouter,
    connect(
        (state) => {
            const formValues = selector(state, 'tree.tree_is_published', 'tree.tree_published_from', 'tree.tree_published_to', 'target')
            return {
                formValues,
            }
        },
        (dispatch) => {
            return bindActionCreators(
                {
                    fetchParentCategorySelectOptions: actions.fetchParentCategorySelectOptions,
                    addLink: actions.addLink,
                },
                dispatch,
            )
        },
    ),
    reduxForm({
        form: FORM_NAME,
        onSubmit: (values, dispatch, { save, navigate, setIsLoading }) => {
            setIsLoading(true)
            return save(values).then(
                ({ data }) => {
                    setIsLoading(false)
                    navigate(`/cms/pages?parent_id=${data.parent_id}`)
                },
                (response) => {
                    setIsLoading(false)
                    throw new SubmissionError(processAPIerrorResponseToFormErrors(response))
                },
            )
        },
        enableReinitialize: true,
        destroyOnUnmount: false,
    }),
)(AddLinkFormContainerBase)

export { AddLinkFormContainer }
export default { AddLinkFormContainer }

import * as React from 'react'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/layout/_layout.scss'
import { navigation } from '../../../config/navigation'
import { NavigationItems } from './NavigationItems'

const cx = classNames.bind(styles)

class Navigation extends React.Component<null, null> {
    state = {
        nested: [],
    }

    setNested(itemId, parentId) {
        const { nested } = this.state

        if (!nested.includes(parentId)) {
            this.setState({
                nested: [itemId],
            })
        } else {
            this.setState({
                nested: [...nested, itemId],
            })
        }
    }
    render() {
        const { nested } = this.state
        return (
            <div className={cx('layout__sidebar__content__navigation')}>
                <NavigationItems
                    items={navigation}
                    setNested={this.setNested.bind(this)}
                    nestedIds={nested}
                ></NavigationItems>
            </div>
        )
    }
}

export { Navigation }

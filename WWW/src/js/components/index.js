import { Card } from './ui/Card/index'
import { Checkbox } from './form/Checkbox/index'
import { Badge } from './ui/Badge/index'
import { Button } from './ui/Button/index'
import { IconBox } from './ui/IconBox/index'
import { LoadingOverlay } from './ui/LoadingOverlay/index'
import { Header } from './ui/Header/index'
import { Select } from './form/Select/index'
import { TextField } from './form/TextField/index'
import { Row } from './ui/Row/index'
import { Col } from './ui/Col/index'
import { Section } from './ui/Section/index'
import { FormField } from './form/FormField/index'
import { TextArea } from './form/TextArea/index'
import { Alert } from './ui/Alert/index'
import { ButtonGroup } from './ui/ButtonGroup'
import { Label } from './ui/Label/index'
import { Radio } from './form/Radio/index'
import { Modal } from './ui/Modal/index'
import {
    Container as PageHeaderContainer,
    Title as PageHeaderTitle,
    Breadcrumbs as PageHeaderBreadcrumbs,
    BreadcrumbsItem as PageHeaderBreadcrumbsItem,
    Actions as PageHeaderActions,
} from './ui/PageHeader'
import { Breadcrumbs } from './ui/Breadcrumbs'
import { Copyright } from './common/Copyright'
import {
    Container as PopoverContainer,
    Trigger as PopoverTrigger,
    Content as PopoverContent,
} from './ui/Popover'
import {
    Container as TabContainer,
    Content as TabContent,
    Trigger as TabTrigger,
    Tab,
} from './ui/Tabs/index'
import {
    DropdownContainer,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from './ui/Dropdown/index'
import { Container as TypographyContainer } from './ui/Typography'
import { Progress } from './ui/Progress'
import {
    Container as AccordionContainer,
    Item as AccordionItem,
    ItemContent as AccordionItemContent,
    ItemHeader as AccordionItemHeader,
} from './ui/Accordion'
import {
    Table as TableContainer,
    Th as ThComponent,
    THead as THeadComponent,
    TBody as TBodyComponent,
    Td as TdComponent,
    Tr as TrComponent,
} from './ui/Table'
import {
    Container as ListContainer,
    Item as ListItem,
    Image as ListImage,
    ItemContent as ListItemContent,
} from './ui/List'
import { Tooltip } from './ui/Tooltip'
import {
    NewModalContainer,
    NewModalBody,
    NewModalFooter,
    NewModalHeader,
} from './ui/NewModal'

const Tabs = {
    Container: TabContainer,
    Content: TabContent,
    Trigger: TabTrigger,
    Tab,
}

const Dropdown = {
    Container: DropdownContainer,
    Trigger: DropdownTrigger,
    Menu: DropdownMenu,
    Item: DropdownItem,
}

const Popover = {
    Container: PopoverContainer,
    Trigger: PopoverTrigger,
    Content: PopoverContent,
}

const PageHeader = {
    Container: PageHeaderContainer,
    Title: PageHeaderTitle,
    Breadcrumbs: PageHeaderBreadcrumbs,
    BreadcrumbsItem: PageHeaderBreadcrumbsItem,
    Actions: PageHeaderActions,
}

const Typography = {
    Container: TypographyContainer,
}

const Accordion = {
    Container: AccordionContainer,
    Item: AccordionItem,
    ItemHeader: AccordionItemHeader,
    ItemContent: AccordionItemContent,
}

const Table = {
    Container: TableContainer,
    Th: ThComponent,
    THead: THeadComponent,
    TBody: TBodyComponent,
    Td: TdComponent,
    Tr: TrComponent,
}

const List = {
    Container: ListContainer,
    Item: ListItem,
    Image: ListImage,
    ItemContent: ListItemContent,
}

const NewModal = {
    Container: NewModalContainer,
    Body: NewModalBody,
    Header: NewModalHeader,
    Footer: NewModalFooter,
}

export {
    LoadingOverlay,
    Button,
    Select,
    Checkbox,
    Card,
    IconBox,
    Header,
    TextField,
    Row,
    Col,
    Section,
    FormField,
    TextArea,
    Alert,
    Tabs,
    Label,
    Badge,
    Radio,
    Modal,
    Dropdown,
    ButtonGroup,
    Popover,
    Copyright,
    PageHeader,
    Breadcrumbs,
    Typography,
    Progress,
    Accordion,
    Table,
    List,
    Tooltip,
    NewModal,
}

export default {
    TextField,
    LoadingOverlay,
    Button,
    Select,
    Checkbox,
    Card,
    IconBox,
    Header,
    Row,
    Col,
    Section,
    FormField,
    TextArea,
    Alert,
    Tabs,
    Label,
    Badge,
    Radio,
    Modal,
    Dropdown,
    ButtonGroup,
    Popover,
    Copyright,
    PageHeader,
    Breadcrumbs,
    Typography,
    Progress,
    Accordion,
    Table,
    List,
    Tooltip,
    NewModal,
}

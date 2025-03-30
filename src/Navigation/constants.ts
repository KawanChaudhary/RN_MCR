import Home from '../components/Home';
import {InfiniteScroll, ListWithHeader} from '../screen';

export const DRAWER_NAV = [
    {
        id: "1",
        name: "Home",
        component: Home
    },
    {
        id: "2",
        name: "Infinte Scroll Using Flatlist",
        component: InfiniteScroll
    },
    {
        id: "3",
        name: "List with sticky header",
        component: ListWithHeader
    }
]
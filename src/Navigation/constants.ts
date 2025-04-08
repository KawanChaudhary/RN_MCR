import Home from '../components/Home';
import {
  InfiniteScroll,
  ListWithHeader,
  ModalShow,
  MultiScreen,
} from '../screen';
import Carousel from '../screen/Carousel/Carousel';
import TodoApp from '../screen/ReduxSetup/TodoApp';
import TodoAppReduxToolKit from '../screen/ReduxToolkit/TodoApp';

export const DRAWER_NAV = [
  {
    id: '1',
    name: 'Home',
    component: Home,
  },
  {
    id: '2',
    name: 'Infinte Scroll Using Flatlist',
    component: InfiniteScroll,
  },
  {
    id: '3',
    name: 'List with sticky header',
    component: ListWithHeader,
  },
  {
    id: '4',
    name: 'Show Modal',
    component: ModalShow,
  },
  {
    id: '5',
    name: 'Multi Screen Stack',
    component: MultiScreen,
  },
  {
    id: '6',
    name: 'Carousel',
    component: Carousel,
  },
  {
    id: '7',
    name: 'Todo with Redux',
    component: TodoApp,
  },
  {
    id: '8',
    name: 'Todo with Redux Toolkit',
    component: TodoAppReduxToolKit,
  },
];

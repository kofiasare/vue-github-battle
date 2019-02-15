import components from './components';

export default [
    { path: '/', component: components.Home },
    { path: '/battle', component: components.BattleField },
    { path: '/battle/results', component: components.BattleResults },
    { path: '/popular', component: components.Popular },
];
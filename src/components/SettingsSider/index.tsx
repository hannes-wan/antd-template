import React from 'react';
import { MenuProps, theme } from 'antd';
import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import routes from '../../routes';
import { useLocation, useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

function routeToMenuItem(route: any): MenuItem {
  let childrenArray: any[] = []
  if (route.hasOwnProperty("children")) {
    route.children.forEach((child: any) => {
      childrenArray.push(routeToMenuItem(child))
    })
  }

  return childrenArray.length === 0 ?
    route.hasOwnProperty("icon") ? getItem(route.label, route.path, route.icon) : getItem(route.label, route.path) :
    route.hasOwnProperty("icon") ? getItem(route.label, route.path, route.icon, childrenArray) : getItem(route.label, route.path, childrenArray);
}

// 调用匿名函数初始化 items
const items: MenuItem[] = (function (routes: any[]) {
  let menuItems: MenuItem[] = [];
  routes.find((route) => route.path === "/settings" && route.hasOwnProperty("children")).children.forEach((child: any) => {
    menuItems.push(routeToMenuItem(child))
  });

  return menuItems;
})(routes);

// Memorized recursion
function findParent(root: any, target: string, visitedMap: Map<any, string[]> = new Map()): string[] | null {
  if (root.path === target) return [root.path];
  if (visitedMap.has(root)) return visitedMap.get(root)!;

  if (root.hasOwnProperty("children")) {
    for (const child of root.children) {
      const pathToChild = findParent(child, target, visitedMap);
      if (pathToChild) {
        const fullpath = [root.path, ...pathToChild];
        visitedMap.set(root, fullpath);
        return fullpath;
      }
    }
  }

  return null;
}

const App: React.FC = () => {

  const navigateTo = useNavigate()
  const currentRoute = useLocation()

  const {
    token: { colorBgContainer },
  } = theme.useToken();


  const onClick: MenuProps['onClick'] = (e) => {
    navigateTo(e.key)
  };

  
  return (
    <Sider style={{ background: colorBgContainer }} width={200}>
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultSelectedKeys={[currentRoute.pathname]}
        defaultOpenKeys={[findParent(routes.find((route) => route.path === "/settings" && route.hasOwnProperty("children")) as any, currentRoute.pathname)?.[1] ?? ""]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default App;
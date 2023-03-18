import React from 'react';
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import routes from "../../routes";

const Comp: React.FC = () => {
  const currentRoute = useLocation()

  // Memorized recursion
  function findPath(root: any, target: string, visitedMap: Map<any, string[]> = new Map()): string[] | null {
    if (root.path === target) return [root.label];
    if (visitedMap.has(root)) return visitedMap.get(root)!;

    if (root.hasOwnProperty("children")) {
      for (const child of root.children) {
        const pathToChild = findPath(child, target, visitedMap);
        if (pathToChild) {
          const fullpath = [root.label, ...pathToChild];
          visitedMap.set(root, fullpath);
          return fullpath;
        }
      }
    }

    return null;
  }

  const breadcrumbs: string[] = findPath(routes.find((route) => route.path === "/settings" && route.hasOwnProperty("children")) as any, currentRoute.pathname) || [];

  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      {/* 每个元素都必须有一个特定的key */}
      {breadcrumbs.map((breadcrumb: string, index: number) => (<Breadcrumb.Item key={index}>{breadcrumb}</Breadcrumb.Item>))}
    </Breadcrumb>
  )
};

export default Comp;
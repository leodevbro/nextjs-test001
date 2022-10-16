import MainNavigation from './MainNavigation';
import classes from './Layout.module.scss';
import { NextPage } from 'next/types';
import { ReactNode } from 'react';

const Layout: NextPage<{ children: ReactNode }> = (props) => {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;

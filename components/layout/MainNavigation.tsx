import { NextPage } from "next";
import Link from "next/link";
import classes from "./MainNavigation.module.scss";

const MainNavigation: NextPage<{}> = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Meetups</div>
      <nav>
        <ul>
          <li>
            <Link href="/meetups">
              <a>All Meetups</a>
            </Link>
          </li>
          <li>
            <Link href="/meetups/new-meetup">
              <a>Add New Meetup</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

import { Fragment } from "react";
import { LINKS } from "./constants";
import styles from "./index.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav>
        {LINKS.map((link, i) => (
          <Fragment key={i}>
            <h2 className={styles.item}>{link.nm}</h2>

            {link.items && (
              <ul className={styles.linkContainer}>
                {link.items.map((item, j) => <LinkItem key={j} {...item} />)}
              </ul>
            )}
          </Fragment>
        ))}
      </nav>
    </aside>
  );
}

function LinkItem({ nm, Icon }: { nm: string, Icon: React.FC }) {
  return (
    <li className={styles.link}>
      <div className={styles.iconContainer}>
        {Icon && <Icon />}
      </div>
      <div>{nm}</div>
    </li>
  );
}

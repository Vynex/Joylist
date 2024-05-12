import styles from "./index.module.css";

export default function Toggle({ children, active, onClick, Icon }: { Icon: React.FC; active?: boolean, children: React.ReactNode; onClick: () => void })  {
  return (
    <button className={`${styles.toggle} ${active ? styles.active : ""}`} onClick={onClick}>
      {Icon && <Icon />}
      {children}
    </button>
  );
}

import Header from "./_components/header";
import Sidebar from "./_components/sidebar";
import Footer from "./_components/footer";
import styles from "./template.module.css";

type Props = {
  children: React.ReactNode;
};

export default function Template({ children }: Readonly<Props>) {
  return <>
    <main className={styles.container}>
      <Header />

      <div className={styles.body}>
        <Sidebar />
        {children}
      </div>
    </main>

    <Footer />
  </>;
}

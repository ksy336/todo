import styles from "./Header.module.css";

interface HeaderProps {
    todoCount: number
}
const Header: React.FC<HeaderProps> = ({todoCount}) => {
    return (
        <header className={styles.header}>
            <div>
                <h1>All task counts {todoCount}</h1>
            </div>
        </header>
    );
};

export default Header;
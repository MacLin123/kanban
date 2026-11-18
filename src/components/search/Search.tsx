import { Icon } from "../icon";
import { Button } from "../button";
import styles from "./Search.module.css";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function Search({ value, onChange, placeholder = "Поиск..." }: SearchProps) {
  function clear() {
    onChange("");
  }

  return (
    <div className={styles.root}>
      <span className={styles.icon}>
        <Icon name="search" color="secondary" />
      </span>
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
      />
      {value && (
        <div className={styles.clear}>
          <Button variant="ghost" onClick={clear}>
            <Icon name="cross" color="inherit" />
          </Button>
        </div>
      )}
    </div>
  );
}

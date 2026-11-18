import { Search } from "../../../../components/search";
import styles from "./BoardHeader.module.css";

interface BoardHeaderProps {
  totalCount: number;
  filteredCount: number;
  query: string;
  onQueryChange: (query: string) => void;
}

export function BoardHeader({ totalCount, filteredCount, query, onQueryChange }: BoardHeaderProps) {
  const countLabel = query.trim()
    ? `Найдено задач ${filteredCount} из ${totalCount}`
    : `Всего задач: ${totalCount}`;

  return (
    <header className={styles.root}>
      <div className={styles.heading}>
        <h1>Your tasks</h1>
        <p className={styles.count}>{countLabel}</p>
      </div>
      <div className={styles.search}>
        <Search value={query} onChange={onQueryChange} placeholder="поиск..." />
      </div>
    </header>
  );
}

import * as Label from '@radix-ui/react-label';
import styles from './Field.module.css';

export default function Field({ label, htmlFor, children }) {
  return (
    <div className={styles.field}>
      <Label.Root className={styles.label} htmlFor={htmlFor}>
        {label}
      </Label.Root>
      {children}
    </div>
  );
}

export const Input = (props) => <input className={styles.input} {...props} />;

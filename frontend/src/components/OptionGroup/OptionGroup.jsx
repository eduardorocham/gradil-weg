import * as ToggleGroup from '@radix-ui/react-toggle-group';
import ColorDot from '../ColorTag/ColorDot';
import styles from './OptionGroup.module.css';

export default function OptionGroup({ id, value, onChange, options }) {
  return (
    <ToggleGroup.Root
      id={id}
      type="single"
      className={styles.group}
      value={value}
      onValueChange={(newValue) => newValue && onChange(newValue)}
    >
      {options.map((option) => (
        <ToggleGroup.Item
          key={option.value}
          value={option.value}
          className={styles.option}
        >
          {option.color && <ColorDot color={option.color} />}
          {option.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}

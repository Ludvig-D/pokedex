import styles from './TypeIcons.module.css';

export default function TypeIcons({ types }) {
  console.log(`type-${types[0].type.name}`);
  return (
    <>
      {types != undefined && (
        <div className={styles.typeDiv}>
          {types.map((type) => (
            <p
              className={`${styles.typeIcon} ${
                styles[`type-${type.type.name}`]
              }`}
              key={type.slot}
            >
              {type.type.name}
            </p>
          ))}
        </div>
      )}
    </>
  );
}

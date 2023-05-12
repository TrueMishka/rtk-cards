import { useEffect } from "react";
import { useActions, useAppSelector } from 'common/hooks';
import { packsThunks } from "features/packs/packs.slice";
import s from "./styles.module.css";
import { PackType } from "features/packs/packs.api";
import { selectPacks } from 'features/packs/packs.selector';

export const Packs = () => {
  const cardPacks = useAppSelector(selectPacks);
  const {fetchPacks, createPack, removePack, updatePack} = useActions(packsThunks)

  useEffect(() => {
    fetchPacks()
  }, []);

  const addPackHandler = () => {
    const newPack = {
      name: "🦁" + Math.random(),
    };
    createPack(newPack)
  };

  const removePackHandler = (id: string) => {
    removePack(id)
  };

  const updatePackHandler = (pack: PackType) => {
    const newName = "🦖" + Math.random();
    updatePack({ ...pack, name: newName })
  };

  return (
    <div>
      <h1>Packs</h1>
      <button onClick={addPackHandler}>add pack</button>
      <div>
        {cardPacks.map((p) => {
          return (
            <div key={p._id} className={s.container}>
              <p>
                <b>pack name</b>: {p.name}
              </p>
              <p>
                <b>cardsCount</b>: {p.cardsCount}
              </p>
              <p>
                <b>user name</b>: {p.user_name}
              </p>
              <button onClick={() => removePackHandler(p._id)}>remove</button>
              <button onClick={() => updatePackHandler(p)}>update</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
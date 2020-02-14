import React, { useContext, useEffect } from 'react';
import wurd from 'wurd-web';
import { WurdContext } from './object';


export default function WurdText({ block, id, sid, type = 'span', component: Component = type, vars, ...rest }) {
  const keysRegister = useContext(WurdContext);

  useEffect(() => {
    if (!keysRegister) return undefined;

    keysRegister.add(id);

    return () => keysRegister.delete(id);
  }, [id]);

  block = block || wurd.content;

  const text = block.text(id, vars);

  const elProps = { ...rest };

  if (wurd.editMode && !keysRegister) { // don't add inline edit if there's a parent WurdObject in detect mode
    const editorType = vars ? 'data-wurd-md' : 'data-wurd';

    elProps[editorType] = block.id(sid || id);
  }

  return React.createElement(Component, elProps, text);
}

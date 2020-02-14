import React, { useContext, useEffect } from 'react';
import wurd from 'wurd-web';
import { WurdContext } from './object';


export default function WurdImage({ block, id, sid, ...rest }) {
  const keysRegister = useContext(WurdContext);

  useEffect(() => {
    if (!keysRegister) return undefined;

    keysRegister.add(id);

    return () => keysRegister.delete(id);
  }, [id]);

  block = block || wurd.content;

  const url = block.text(id);

  const elProps = {
    ...rest,
    src: url
  };

  if (wurd.editMode && !keysRegister) { // don't add inline edit if there's a parent WurdObject in detect mode
    elProps['data-wurd-img'] = block.id(sid || id);
  }

  return React.createElement('img', elProps);
}

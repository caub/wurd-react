import React, { useContext, useEffect } from 'react';
import wurd from 'wurd-web';
import { WurdContext } from './object';


export default function WurdList({ block, id, children, type = 'ul', keys = 'title', ...rest }) {
  const keysRegister = useContext(WurdContext);

  useEffect(() => {
    if (!keysRegister) return undefined;

    keysRegister.add(id);

    return () => keysRegister.delete(id);
  }, [id]);

  block = block || wurd.content;

  const elProps = { ...rest };

  if (wurd.editMode && !keysRegister) { // don't add inline edit if there's a parent WurdObject in detect mode
    elProps['data-wurd-list'] = block.id(id);
    elProps['data-wurd-list-props'] = keys;
  };

  return React.createElement(type, elProps,
    block.map(id, (item, itemId) => children(item, itemId))
  );
}

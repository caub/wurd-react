import React, { useContext, useEffect } from 'react';
import wurd from 'wurd-web';
import { WurdContext } from './object';


export default function WurdMarkdown({ block, id, sid, type = 'div', vars, ...rest }) {
  const keysRegister = useContext(WurdContext);

  useEffect(() => {
    if (!keysRegister) return undefined;

    keysRegister.add(id);

    return () => keysRegister.delete(id);
  }, [id]);

  block = block || wurd.content;

  const text = block.markdown(id, vars);

  const elProps = {
    ...rest,
    dangerouslySetInnerHTML: { __html: text }
  };

  if (wurd.editMode && !keysRegister) { // don't add inline edit if there's a parent WurdObject in detect mode
    elProps['data-wurd-md'] = block.id(sid || id);
  }

  return React.createElement(type, elProps);
}

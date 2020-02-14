import React, { useState } from 'react';
import wurd from 'wurd-web';


export const WurdContext = React.createContext();


/**
 * WurdObject is used to wrap multiple wurd items in one edit dialog
 * - you can specify the wurds ids explicitely with `keys` prop
 * - you can also use the `detect` prop, to auto-detect wurd ids
 *      from children WurdText, WurdMarkdown, WurdImage, WurdList
 * So those 3 ways are equivalent:
 * ```jsx
 * <WurdObject id="a" keys="b1,b2">
 *   {wurd.text('a.b1')}
 *   {wurd.text('a.b2')}
 * </WurdObject>
 * ```
 * ```jsx
 * <WurdObject id="a" detect>
 *   <WurdText id="a.b1" />
 *   <WurdText id="a.b2" />
 * </WurdObject>
 * ```
 * ```jsx
 * <WurdObject id="a" detect keys="b2">
 *   <WurdText id="a.b1" />
 *   {wurd.text('a.b2')}
 * </WurdObject>
 * ```
 * @param {object} props
 * @param {string} [props.id]
 * @param {string|array} [props.keys]
 * @param {boolean} [props.detect]
 */
export default function WurdObject({
  block,
  id, sid,
  keys, detect,
  type = 'span', component: Component = type,
  children,
  ...rest
}) {
  const [ids, setIds] = useState(Array.isArray(keys) ? keys : keys ? keys.split(',') : []);

  block = block || wurd.content;

  const elProps = { ...rest };

  if (wurd.editMode) {
    // Normalise keys to string in form 'key1,key2'

    elProps['data-wurd-obj'] = block.id(sid || id);
    elProps['data-wurd-obj-props'] = ids.join(',');
  }

  if (!detect) {
    return React.createElement(Component, elProps, children);
  }

  const keysRegister = {
    add(id) {
      setIds(ids => {
        return ids.includes(id) ? ids : [...ids, id];
      });
    },
    delete(id) {
      setIds(ids => {
        return !ids.includes(id) ? ids : ids.filter(v => v !== id);
      });
    }
  };

  return React.createElement(WurdContext.Provider, { value: keysRegister },
    React.createElement(Component, elProps, children)
  );
}

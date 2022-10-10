import { CustomBlockRenderer } from 'react-native-render-html';

const TruncatedBodyRender: CustomBlockRenderer = ({ TDefaultRenderer, tnode, ...props }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  tnode.children = tnode.children.filter((o, i) => i === 0);

  return <TDefaultRenderer {...props} tnode={tnode} />;
};

export default TruncatedBodyRender;

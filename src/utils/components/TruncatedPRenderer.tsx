import { Text } from 'native-base';
import { TNodeChildrenRenderer, CustomTextualRenderer } from 'react-native-render-html';

const PRenderer: CustomTextualRenderer = ({ TDefaultRenderer, textProps, ...props }) => {
  const tchildrenAreText = props.tnode.children.every(
    t => t.type === 'text' || t.type === 'phrasing',
  );
  const children = <TNodeChildrenRenderer tnode={props.tnode} />;

  return (
    <TDefaultRenderer {...props} textProps={{}}>
      {tchildrenAreText ? <Text numberOfLines={2}>{children}</Text> : children}
    </TDefaultRenderer>
  );
};

export default PRenderer;

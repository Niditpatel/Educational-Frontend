import { Tooltip as ReactTooltip } from "react-tooltip";

export const Tooltip = (props: any) => {
  const { id } = props;
  return <ReactTooltip anchorId={id} />;
};

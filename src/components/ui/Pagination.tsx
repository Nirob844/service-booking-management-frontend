import { Pagination } from "antd";

type SBProps = {
  page: number;
  total: number | undefined;
  onChange: (current: number) => void; // Add onChange prop
};

const SBPagination = ({ page, total, onChange }: SBProps) => (
  <Pagination defaultCurrent={page} total={total} onChange={onChange} />
);

export default SBPagination;

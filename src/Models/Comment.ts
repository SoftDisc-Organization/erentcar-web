import Audit from "./Audit";

export default interface Comment extends Audit {
  id: number;
  comment: string;
}
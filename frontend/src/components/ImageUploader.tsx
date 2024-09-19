/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const ImageUpload = ({ onChange }: {onChange:any}) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" onChange={onChange} />
    </div>
  );
};

export default ImageUpload;

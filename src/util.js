export function uid() {
  return uid.prototype.cntr++;
}

uid.prototype.cntr = 0;

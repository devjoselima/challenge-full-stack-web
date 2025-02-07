export const cpfMask = (value: string) => {
  const cleanedValue = value.replace(/\D/g, "").slice(0, 11);

  return cleanedValue
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
}
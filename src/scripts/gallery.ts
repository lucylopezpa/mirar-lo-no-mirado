import data from "../data.json";

const images = new Map<string, any>();

data.forEach((image) => {
  images.set(image.Identificador, {
    ...image,
    Imagen: `/idaesbra-mirarlonomirado/images/salas/${image.Identificador}.jpg`,
  });
});

type ImageMetadata = {
  metadata: Record<string, string>
  csv: Array<Array<string>>
}

export function getImageMetadata(id: string): ImageMetadata | null {
  const metadata = images.get(id);
  if (!metadata) {
    return null;
  }
  const csv = Object.entries(metadata).reduce<Array<Array<string>>>(
    (result, [key, value]) => {
      if (["Imagen", "Identificador"].includes(key)) return result;
      return [...result, [key, value + ""]];
    },
    [],
  );
  return { metadata, csv };
}

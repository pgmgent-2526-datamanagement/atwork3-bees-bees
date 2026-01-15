import ApiaryMap from './ApiaryMap';

interface ApiaryMapWrapperProps {
  latitude: number;
  longitude: number;
  showGbifData?: boolean;
}

export default function ApiaryMapWrapper({ latitude, longitude, showGbifData = false }: ApiaryMapWrapperProps) {
  return <ApiaryMap latitude={latitude} longitude={longitude} showGbifData={showGbifData} />;
}


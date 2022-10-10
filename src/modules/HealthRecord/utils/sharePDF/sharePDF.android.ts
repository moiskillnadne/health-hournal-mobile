import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import Config from 'react-native-config';

const { API_URL } = Config;

const FILE_URL = `${API_URL}/share/health-record`;
const TYPE = 'application/pdf';

function sharePDF({ token, unit }: { token: string; unit: string }) {
  let filePath = null as Maybe<string>;

  const configOptions = { fileCache: true };

  return RNFetchBlob.config(configOptions)
    .fetch('GET', FILE_URL, {
      Authorization: `Bearer ${token}`,
      Measurement: unit,
    })
    .then(resp => {
      filePath = resp.path();

      return resp.readFile('base64');
    })
    .then((base64Response: string) => {
      const base64Data = `data:${TYPE};base64,${base64Response}`;

      Share.open({ url: base64Data }).finally(() => {
        if (filePath) {
          RNFetchBlob.fs.unlink(filePath);
        }
      });
    });
}

export default sharePDF;

import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import Config from 'react-native-config';

const { API_URL } = Config;

const FILE_URL = `${API_URL}/share/health-record`;

const TYPE = 'application/pdf';

const FILE_NAME = 'HealthRecordReport.pdf';

function sharePDF({ token, unit }: { token: string; unit: string }) {
  let filePath = null as Maybe<string>;

  const DIRS = RNFetchBlob.fs.dirs;

  const configOptions = {
    fileCache: true,
    path: `${DIRS.DocumentDir}/${FILE_NAME}`,
  };

  return RNFetchBlob.config(configOptions)
    .fetch('GET', FILE_URL, {
      Authorization: `Bearer ${token}`,
      Measurement: unit,
    })
    .then(resp => {
      filePath = resp.path();

      const options = {
        type: TYPE,
        url: filePath,
      };

      Share.open(options).finally(() => {
        if (filePath) {
          RNFetchBlob.fs.unlink(filePath);
        }
      });
    });
}

export default sharePDF;

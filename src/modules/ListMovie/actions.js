export const SAVE_DATA = 'SAVE_DATA'

function setMovieInfo(data) {
  return {
    type:SAVE_DATA,
    payload: data
  }
}

export {setMovieInfo}

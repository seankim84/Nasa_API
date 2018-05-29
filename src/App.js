import React, {Component} from 'react';
import ViewerTemplate from './components/ViewerTemplate';
import SpaceNavigator from './components/SpaceNavigator';
import moment from 'moment';
import Viewer from './components/Viewer';

import * as api from './lib/api';

class App extends Component {

  state = {
    loading: false,
    maxDate: null,
    date: null,
    url: null,
    mediaType: null
  }

  getAPOD = async (date) => {
    if (this.state.loading) return; //이미 요청중이라면 무시

    //loading 상태 시작
    this.setState({
      loading: true
    });

    try {
      const response = await api.getAPOD(date);
      console.log(response)
      //비구조화 할당 + 새로운 이름(여기서 date: retrievedDate로 설정)
      //여기서 response.data 안에 있는 값을 바꿔준다.
      const {date: retrievedDate, url, media_type: mediaType} = response.data;

      if(!this.state.maxDate){
        //maxDate가 없으면, 지금받은 date로 지정
        this.setState({
          maxDate: retrievedDate
        })
      }
      //전달받은 Date넣어주기
      this.setState({
        date: retrievedDate,
        mediaType,
        url
      });
    } catch(e){
      //오류발생시
      console.log(e)
    }
    //loading 상태 종료
    this.setState({
      loading: false
    });
  }

  handlePrev = () => {
    const { date } = this.state;
    const prevDate = moment(date).subtract(1, 'days').format('YYYY-MM-DD');
    console.log(prevDate);
    this.getAPOD(prevDate);
    }

  handleNext = () => {
    const {date, maxDate} = this.state;
    if(date === maxDate) return;

    const nextDate = moment(date).add(1, 'days').format('YYYY-MM-DD');
    this.getAPOD(nextDate)
  }

  componentDidMount() {
    this.getAPOD();
  }
  
  render(){
    const {url, mediaType, loading} = this.state;
    const { handlePrev, handleNext } = this;
    
    
    return(
      <ViewerTemplate 
        spaceNavigator={<SpaceNavigator 
            onPrev={handlePrev}
            onNext={handleNext}
          />}
        viewer = {(
          <Viewer 
            url = {url}
            mediaType = {mediaType}
            loading = {loading}
            />
        )}
      />
    );  
  }
}

export default App;

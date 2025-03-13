import React, { useEffect } from 'react';

const NaverMap = ({ postData }) => {
  // useEffect(() => {
  //   let map = null;
  //   let marker = null;

  //   const initMap = () => {
  //     // 전달된 postData에서 latitude와 longitude 값을 가져와 지도의 중심으로 설정
  //     const centerLatLng = new naver.maps.LatLng(
  //       postData?.latitude,
  //       postData?.longitude,
  //     );

  //     map = new naver.maps.Map('map', {
  //       center: centerLatLng,
  //       zoom: 10,
  //     });

  //     marker = new naver.maps.Marker({
  //       position: centerLatLng, // Marker의 위치를 지도 중심으로 설정
  //       map: map,
  //     });
  //   };

  //   // PostData가 변경될 때마다 지도를 초기화
  //   initMap();
  // }, [postData]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://oapi.map.naver.com/openapi/v3/maps.js?ncpClient=x50dv39aur';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const mapStyle = {
    width: '75vw',
    height: '25vw',
  };

  return (
    <div>
      <div id="map" style={mapStyle} />
    </div>
  );
};

export default NaverMap;

#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const subscribersFile = path.join(__dirname, 'data', 'newsletter-subscribers.json');

function checkSubscribers() {
  try {
    if (!fs.existsSync(subscribersFile)) {
      console.log('❌ 구독자 데이터 파일이 없습니다.');
      return;
    }

    const data = JSON.parse(fs.readFileSync(subscribersFile, 'utf8'));
    
    console.log('📊 뉴스레터 구독자 현황');
    console.log('='.repeat(50));
    console.log(`총 구독자 수: ${data.length}명`);
    console.log(`활성 구독자: ${data.filter(s => s.status === 'active').length}명`);
    console.log(`비활성 구독자: ${data.filter(s => s.status === 'inactive').length}명`);
    console.log('');

    if (data.length > 0) {
      console.log('📋 구독자 목록:');
      data.forEach((subscriber, index) => {
        console.log(`${index + 1}. ${subscriber.name} (${subscriber.email})`);
        console.log(`   소속: ${subscriber.organization}`);
        console.log(`   면허번호: ${subscriber.licenseNumber}`);
        console.log(`   구독일: ${new Date(subscriber.subscribedAt).toLocaleDateString('ko-KR')}`);
        console.log(`   상태: ${subscriber.status === 'active' ? '활성' : '비활성'}`);
        console.log('');
      });
    }

    // 기관별 통계
    const organizations = {};
    data.forEach(sub => {
      organizations[sub.organization] = (organizations[sub.organization] || 0) + 1;
    });

    if (Object.keys(organizations).length > 0) {
      console.log('🏥 기관별 구독자 수:');
      Object.entries(organizations).forEach(([org, count]) => {
        console.log(`   ${org}: ${count}명`);
      });
    }

  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  }
}

checkSubscribers(); 
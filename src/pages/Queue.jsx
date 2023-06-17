import React from 'react'
import { Badge, Descriptions } from 'antd';
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { ENCOING_STATUS_API, fetcher } from '../constant'
import HeaderComp from '../components/Header'
import HeadLineComp from '../components/HeadLine'

const QueuePage = () => {
  const params = useParams()
  const { data, error, isLoading } = useSWR(`${ENCOING_STATUS_API}/${params.uuid}`, fetcher)

  console.log(data, error, isLoading)
  return (<>
    <HeaderComp />
    <div className="container">
      <HeadLineComp />

      {
        isLoading ? (
          <p>LOADING</p>
        ) : 
        (
          <Descriptions title="인코딩 대기열" bordered>
            <Descriptions.Item label="UUID">{params.uuid}</Descriptions.Item>
            <Descriptions.Item label="인코딩 시작 시간" span={2}>
              {data.order.dequeuedAt}
            </Descriptions.Item>
            <Descriptions.Item label="대기자" span={3}>
              {data.beforeOrderCount}개 남음
            </Descriptions.Item>
          </Descriptions>
        )
      }

      
    </div>
  </>)
}

export default QueuePage
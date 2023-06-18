import React from 'react'
import { Alert, Badge, Descriptions, Skeleton, List, Typography, Tag, Button } from 'antd';
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { ENCOING_STATUS_API, fetcher } from '../constant'
import HeaderComp from '../components/Header'
import HeadLineComp from '../components/HeadLine'
import { isUndefined } from 'swr/_internal';
import Footer from '../components/Footer';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  CloudDownloadOutlined
} from '@ant-design/icons';

const { Title } = Typography;

const QueuePage = () => {
  const params = useParams()
  const { data, error, isLoading } = useSWR(`${ENCOING_STATUS_API}/${params.uuid}`, fetcher, {
    refreshInterval: 1000
  })

  return (<>
    <HeaderComp />
    <div className="container">
      <HeadLineComp />

      {
        error && (
          <Alert message={error} type="error" showIcon style={{ marginBottom: 32 }} />
        )
      }

      {
        (!isLoading && data.statusCode) && (
          <Alert message={`An error occurred. HttpStatus: ${data.statusCode}`} type="error" showIcon style={{ marginBottom: 32 }} />
        )
      }


      {
        isLoading && (
          <Skeleton />
        )
      }

      {
        (!isLoading && !isUndefined(data.order)) && (
          <>
          <Descriptions title="인코딩 대기열" bordered>
            <Descriptions.Item label="UUID">{params.uuid}</Descriptions.Item>
            <Descriptions.Item label="인코딩 시작 시간" span={2}>
              {data.order.dequeuedAt ?? 'INQUEUE 대기 중'}
            </Descriptions.Item>
            <Descriptions.Item label="남은 대기열">
              {data.order.beforeOrderCount}개 남음
            </Descriptions.Item>
            <Descriptions.Item label="현재 상태">
              {
                (data.order.dequeuedAt && data.order.beforeOrderCount === 0) && (
                  <Badge status="success" text="INQUEUE 됨" />
                )
              }

              {
                (data.order.dequeuedAt && data.order.beforeOrderCount !== 0) && (
                  <Badge status="processing" text="INQUEUE 중" />
                )
              }

              {
                (!data.order.dequeuedAt) && (
                  <Badge status="warning" text="대기 중" />
                )
              }
            </Descriptions.Item>
          </Descriptions>
          <br /><br />

          <Title level={5}>인코딩 결과</Title>
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            bordered={true}
            dataSource={data.items}
            renderItem={(item) => (
              <List.Item>
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    description={item.originalName}
                  />
                  {
                    item.status === 'WAIT' && (
                      <Tag icon={<ClockCircleOutlined />} color="default">
                        준비 중
                      </Tag>
                    )
                  }
                  {
                    item.status === 'IN_PROGRESS' && (
                      <Tag icon={<SyncOutlined spin />} color="processing">
                        처리 중... {item.rate}% 완료
                      </Tag>
                    )
                  }
                  {
                    item.status === 'COMPLETED' && (
                      <Tag icon={<CheckCircleOutlined  />} color="success">
                        완료 됨
                      </Tag>
                    )
                  }
                  {
                    item.status === 'ERROR' && (
                      <Tag icon={<ClockCircleOutlined />} color="default">
                        오류 발생
                      </Tag>
                    )
                  }

                  {
                    (!item.export || item.export.status === 'WAITING') && (
                      <Button type="primary" disabled>
                        인코딩 완료 대기 중
                      </Button>
                    )
                  }

                  {
                    (item.export && item.export.status === 'UPLOADING') && (
                      <Button type="primary" loading disabled size="small">
                        업로드 중
                      </Button>
                    )
                  }

                  {
                    (item.export && item.export.status === 'DONE') && (
                      <Button type="primary" icon={<CloudDownloadOutlined />} size="small" onClick={() => window.open(item.export.downloadUrl)}>
                        다운로드
                      </Button>
                    )
                  }
                </Skeleton>
              </List.Item>
            )}
          />
          </>
        )
      }
      
      <Footer />
    </div>
  </>)
}

export default QueuePage
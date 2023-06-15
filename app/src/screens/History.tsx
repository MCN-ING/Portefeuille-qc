import { useConnections, useCredentials, useProofs } from '@aries-framework/react-hooks'
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import HistoryHeader from '../components/HistoryHeader'
import { HistoryActionstype, lookBack, records } from '../constants'

const History: React.FC = () => {
  const { records: credentialRecords } = useCredentials()
  const { records: proofRecords } = useProofs()
  const { records: connectionRecords } = useConnections()

  const [history, setHistory] = useState<records[]>([])
  const [sortType, setSortType] = useState<'asc' | 'desc'>('asc')
  const [recordsLookBack, setRecordsLookBack] = useState<lookBack>('all')
  const [recordsType, setRecordsType] = useState<HistoryActionstype[]>([
    'CredentialRecord',
    'ProofRecord',
    'ConnectionRecord',
  ])

  const sortRecords = (records: records[]) => {
    if (sortType === 'asc') {
      return records.sort((a, b) => Date.parse(a.createdAt.toDateString()) - Date.parse(b.createdAt.toDateString()))
    }
    return records.sort((a, b) => Date.parse(b.createdAt.toDateString()) - Date.parse(a.createdAt.toDateString()))
  }

  const filterLookBackRecords = (records: records[]) => {
    switch (recordsLookBack) {
      case 'day':
        return records.filter((record) => Date.parse(record.createdAt.toDateString()) === Date.now())
      case 'week':
        return records.filter((record) => Date.parse(record.createdAt.toDateString()) >= Date.now() - 604800000)
      case 'month':
        return records.filter((record) => Date.parse(record.createdAt.toDateString()) >= Date.now() - 2629800000)
      case 'year':
        return records.filter((record) => Date.parse(record.createdAt.toDateString()) >= Date.now() - 31557600000)
      default:
        return records
    }
  }

  const filterType = (records: records[]) => {
    return records.filter((p) => {
      return recordsType.includes(p.type)
    })
  }

  const createHistory = () => {
    const filteredRecords = sortRecords(
      filterLookBackRecords(filterType([...credentialRecords, ...proofRecords, ...connectionRecords]))
    )
    setHistory(filteredRecords)
  }

  useEffect(() => {
    createHistory()
  }, [useConnections, useCredentials, useProofs, sortType, recordsLookBack, recordsType])

  return (
    <View>
      <FlatList
        ListHeaderComponent={
          <HistoryHeader
            setSortType={setSortType}
            sortType={sortType}
            setRecordsType={setRecordsType}
            recordsType={recordsType}
            setRecordsLookBack={setRecordsLookBack}
            recordsLookBack={recordsLookBack}
          />
        }
        data={history}
        renderItem={({ item }) => (
          <View>
            <Text style={{ color: 'black' }}>{JSON.stringify(item)}</Text>
          </View>
        )}
      />
    </View>
  )
}

export default History

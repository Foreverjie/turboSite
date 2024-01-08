'use client'

import { useCallback, useState } from 'react'
import { Page, Category } from '@prisma/client'

import { useBeforeMounted } from '../../hooks/common/use-before-mounted'

export interface AggregateRoot {
  //   user: UserModel
  //   seo: SeoOptionModel
  //   url: Url
  categories: Category[]
  pageMeta: Pick<Page, 'title' | 'id' | 'slug' | 'order'>[] | null

  //   latestNoteId: { id: string; nid: number }
}

const aggregationDataAtom: AggregateRoot | null = null

export const useAggregationSelector = () =>
  // selector: (state: AggregateRoot) => T,
  // deps: any[] = [],
  {
    const [aggregationData, setAggregationData] =
      useState<AggregateRoot | null>(aggregationDataAtom)

    return {
      aggregationData,
      setAggregationData,
    }
  }

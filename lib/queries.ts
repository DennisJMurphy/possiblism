import { supabase } from './supabase'

export async function getUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) {
        console.error('Error fetching user:', error)
        return null
    }
        return user    
}

export async function fetchUserGroups(user: { id: any } | null) {
  const { data, error } = await supabase
    .from('group_memberships')
    .select('group_id, groups ( id, name )')
    .eq('user_id', user?.id)

  if (error) {
    console.error('Error fetching groups:', error)
    return []
  }
  
  return data || []
}

export async function getMetricsData(groupIds: string[]) {
  const { data, error } = await supabase
    .from('metrics')
    .select('id, name, unit, group_id')
    .in('group_id', groupIds)

  if (error) {
    console.error('Error fetching metrics:', error)
    return []
  }

  return data || []
}


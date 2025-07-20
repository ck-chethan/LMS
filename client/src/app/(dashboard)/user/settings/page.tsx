import SharedNotiificationSettings from '@/components/SharedNotiificationSettings'
import React from 'react'

const UserSettings = () => {
  return (
    <div className="w-3/5">
      <SharedNotiificationSettings
        title="User Settings"
        subtitle="Manage your notification preferences"
      />
    </div>
  )
}

export default UserSettings

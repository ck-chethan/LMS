import SharedNotiificationSettings from '@/components/SharedNotiificationSettings'
import React from 'react'

const TeacherSettings = () => {
  return (
    <div className="w-3/5">
      <SharedNotiificationSettings
        title="Teacher Settings"
        subtitle="Manage your notification preferences"
      />
    </div>
  )
}

export default TeacherSettings

import React, { Component } from 'react';
import FileOpener from '../components/FileOpener';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FileCloudDownload from 'material-ui/svg-icons/file/cloud-download';
import NtrContainer from '../containers/NtrContainer';
import pureRender from 'pure-render-decorator';
import styles from './DumpingFileOpener.module.scss';
import { createSelector } from 'reselect';
import { range } from 'lodash';

const menuItems1To31 = range(1, 32).map(i => <MenuItem key={i} value={i} primaryText={`${i}`} />);
const menuItems1To32 = [...menuItems1To31, <MenuItem key={32} value={32} primaryText="32" />];
const teamSelectors = [
  <MenuItem key={0} value={0} primaryText="My team" />,
  <MenuItem key={1} value={1} primaryText="Opponent team 1" />,
  <MenuItem key={2} value={2} primaryText="Opponent team 2" />,
  <MenuItem key={3} value={3} primaryText="Opponent team 3" />
];

const noExtExt = process.platform === 'darwin' ? '' : '*';
const fileOptions = {
  filters: [{ name: 'SAV (1MB)', extensions: ['bin', 'sav'] },
            { name: 'Main File', extensions: [noExtExt] },
            { name: 'Battle Video', extensions: [noExtExt] }]
};

@pureRender
class DumpingFileOpener extends Component {
  static propTypes = {
    file: React.PropTypes.string,
    fileOpened: React.PropTypes.func,
    backup: React.PropTypes.func,
    type: React.PropTypes.string,
    keyProperties: React.PropTypes.oneOfType([React.PropTypes.boolean, React.PropTypes.object]),
    generation: React.PropTypes.number,
    bvFilterChanged: React.PropTypes.func,
    savFilterChanged: React.PropTypes.func,
    lowerBox: React.PropTypes.number,
    upperBox: React.PropTypes.number,
    teamSelected: React.PropTypes.number
  };

  lowerBoxChanged = (e, i, value) => {
    this.props.savFilterChanged(value, this.props.upperBox);
  };

  upperBoxChanged = (e, i, value) => {
    this.props.savFilterChanged(this.props.lowerBox, value);
  };

  newTeamSelected = (e, i, value) => {
    this.props.bvFilterChanged(value);
  };

  getTeamSelectors = createSelector(
    () => this.props.type,
    () => this.props.keyProperties,
    (type, keyProperties) => teamSelectors.filter((e, i) => type !== 'BV' || keyProperties[i])
  );

  getActiveTeamSelector = createSelector(
    () => this.props.teamSelected,
    () => this.props.keyProperties,
    (teamSelected, keyProperties) => {
      if (keyProperties[teamSelected]) return teamSelected;
      for (let i = 0; i < keyProperties.length; ++i) {
        if (keyProperties[i]) return i;
      }
      return -1;
    }
  );

  render() {
    const menuItems = this.props.generation === 6 ? menuItems1To31 : menuItems1To32;
    return (
      <Paper className={styles.paper}>
        <FileOpener fileOpened={this.props.fileOpened} file={this.props.file} options={fileOptions} />
        <div className={styles.flexFromRight}>
          <IconButton onClick={() => this.props.backup(this.props.file)} disabled={this.props.file === ''}>
            <FileCloudDownload />
          </IconButton>
          <NtrContainer />
          {this.props.type === 'SAV' ?
            <div className={styles.boxSelectorWrapper}>
              <DropDownMenu value={Math.min(this.props.lowerBox, this.props.generation === 6 ? 31 : 32)} onChange={this.lowerBoxChanged}>
                {menuItems.slice(0, this.props.upperBox)}
              </DropDownMenu>
              &ndash;
              <DropDownMenu value={Math.min(this.props.upperBox, this.props.generation === 6 ? 31 : 32)} onChange={this.upperBoxChanged}>
                {menuItems.slice(this.props.lowerBox - 1)}
              </DropDownMenu>
            </div>
          : this.props.type === 'BV' ?
            <div className={styles.boxSelectorWrapper}>
              <DropDownMenu value={this.getActiveTeamSelector()} onChange={this.newTeamSelected}>
                {this.getTeamSelectors()}
              </DropDownMenu>
            </div>
          :
            <div></div>
          }
        </div>
        {this.props.keyProperties === false && this.props.type === 'SAV' ?
          <div className={styles.keyWarning}>
            OLD STYLE KEY: SAVING TWICE REQUIRED
          </div> : undefined
        }
      </Paper>
    );
  }
}

export default DumpingFileOpener;
